defmodule Tunedin.Accounts.CurrentlyListening do
  use GenServer

  @base_url "https://api.spotify.com/v1"
  @schedule_task 10 * 1000 # 10 seconds

  # Client API

  def attach(server_name, user_id, user_token) do
    GenServer.call(server_name, {:attach, user_id, user_token})
  end

  def detach(server_name, user_id) do
    GenServer.call(server_name, {:detach, user_id})
  end

  # Server API

  def start_link(name) do
    GenServer.start_link(__MODULE__, [], name: name)
  end

  def init(_state) do
    {:ok, %{users: Map.new()}}
  end

  def handle_call({:attach, user_id, user_token}, _from, state) do
    state = put_user(state, user_id, user_token)
    state = fetch_current_song(state, user_id)
    {:reply, :ok, state}
  end

  def handle_call({:detach, user_id}, _from, state) do
    case Map.fetch(state.users, user_id) do
      :error ->
        {:reply, :ok, state}
      {:ok, _} ->
        {:reply, :ok, drop_user(state, user_id)}
    end
  end

  def handle_info({:get_current_song, user_id}, state) do
    state = fetch_current_song(state, user_id)
    {:noreply, state}
  end

  defp fetch_current_song(state, user_id) do
    {:ok, user} = get_user(state, user_id)
    headers = [{"Authorization", "Bearer #{user.token}"}]

    case HTTPoison.get("#{@base_url}/me/player/currently-playing", headers) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        {:ok, %{"item" => %{"id" => song_id} = item}} = Poison.decode(body)

        # Song isnt equal to the previous song
        if(song_id !== user.prev_song) do
          IO.puts("HEYYY")
          broadcast("current_song:update", user_id, %{
            success: true,
            track: item
          })
        end

        schedule_task(user_id)

        update_user(state, user_id, song_id)

      {:ok, _reason} ->
        broadcast("current_song:update", user_id, %{
          success: false,
          message: "No song currently playing."
        })

        schedule_task(user_id)

        update_user(state, user_id, 0)
    end
  end

  defp schedule_task(user_id) do
    Process.send_after(self(), {:get_current_song, user_id}, @schedule_task)
  end

  defp put_user(state, user_id, user_token) do
    %{state | users: Map.put(state.users, user_id, %{token: user_token, prev_song: 0})}
  end

  defp update_user(state, user_id, prev_song) do
    %{state | users: Map.update!(state.users, user_id, &(Map.put(&1, :prev_song, prev_song)))}
  end

  defp drop_user(state, user_id) do
    %{state | users: Map.delete(state.users, user_id)}
  end

  defp get_user(state, user_id) do
    Map.fetch(state.users, user_id)
  end

  defp broadcast(topic, id, response) do
    TunedinWeb.Endpoint.broadcast!("user:#{id}", topic, response)
  end
end
