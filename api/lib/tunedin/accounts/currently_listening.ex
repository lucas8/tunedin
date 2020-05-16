defmodule Tunedin.Accounts.CurrentlyListening do
  use GenServer

  @base_url "https://api.spotify.com/v1"
  @schedule_time 10 * 1000 # 30 seconds

  ## Client API

  def shutdown(pid) do
    GenServer.cast(pid, :shutdown)
  end

  def start_link(opts \\ []) do
    GenServer.start_link(__MODULE__, opts, name: __MODULE__)
  end

  def init(state) do
    state |> fetch_song()
    {:ok, state}
  end

  def handle_info(:get_current_song, state) do
    state |> fetch_song()
  end

  def handle_cast(:shutdown, state) do
    Process.exit(self(), :kill)
    {:noreply, state}
  end

  defp schedule_task() do
    Process.send_after(self(), :get_current_song, @schedule_time)
  end

  defp broadcast(topic, id, response) do
    TunedinWeb.Endpoint.broadcast!("user:#{id}", topic, response)
  end

  defp fetch_song(%{token: token, id: user_id, prev_song_id: prev_song_id} = state) do
    headers = [{"Authorization", "Bearer #{token}"}]

    case HTTPoison.get("#{@base_url}/me/player/currently-playing", headers) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        {:ok, %{"item" => %{"id" => songId} = item}} = Poison.decode(body)

        # Check song isnt equal to the previous song
        if(songId !== prev_song_id) do
          broadcast("current_song:update", user_id, %{
            success: true,
            track: item
          })
        end

        schedule_task()

        {:noreply, %{state | prev_song_id: songId}}

      {:ok, _reason} ->
        broadcast("current_song:update", user_id, %{
          success: false,
          message: "No song currently playing."
        })

        schedule_task()

        # We set the prev song id to 0 to send the current song if replayed
        {:noreply, %{state | prev_song_id: 0}}
    end
  end
end
