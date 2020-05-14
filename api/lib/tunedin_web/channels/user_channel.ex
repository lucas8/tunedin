defmodule TunedinWeb.UserChannel do
  use TunedinWeb, :channel

  alias Tunedin.Accounts

  def join("user:" <> id, _params, socket) do
    IO.puts(id)
    send(self(), :after_join)
    {:ok, %{message: "hello world"}, socket}
  end

  def handle_info(:after_join, %{assigns: %{user_id: user_id}} = socket) do
    user = Accounts.get_user!(user_id)
    # Start long running GenServer process
    {:ok, pid} = Tunedin.Accounts.CurrentlyListening.start_link(%{token: user.access_token, id: user.id, prev_song_id: 0})
    {:noreply, assign(socket, :current_pid, pid)}
  end
end
