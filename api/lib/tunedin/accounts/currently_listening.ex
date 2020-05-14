defmodule Tunedin.Accounts.CurrentlyListening do
  use GenServer

  @base_url "https://api.spotify.com/v1"
  @schedule_time 30 * 1000 # 2 minutes

  def start_link(opts \\ []) do
    GenServer.start_link(__MODULE__, opts, name: __MODULE__)
  end

  def init(state) do
    schedule_task()
    {:ok, state}
  end

  def handle_info(:get_current_song, %{token: token, id: id, prev_song_id: prev_song_id} = state) do
    headers = [{"Authorization", "Bearer #{token}"}]

    case HTTPoison.get("#{@base_url}/me/player/currently-playing", headers) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        {:ok, %{"item" => %{"id" => songId} = item}} = Poison.decode(body)

        # Song isnt equal to the previous song
        if(songId !== prev_song_id) do
          broadcast(item, id)
        end

        schedule_task()

        {:noreply, %{state | prev_song_id: songId}}

      {:ok, _} ->
        {:noreply, state}
    end
  end

  def handle_info(:shutdown, state) do
    Process.exit(self(), :kill)
    {:noreply, state}
  end

  defp schedule_task() do
    Process.send_after(self(), :get_current_song, @schedule_time)
  end

  defp broadcast(response, id) do
    TunedinWeb.Endpoint.broadcast!("user:#{id}", "current_song:update", %{
      response: response
    })
  end
end
