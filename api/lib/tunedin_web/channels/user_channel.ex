defmodule TunedinWeb.UserChannel do
  use TunedinWeb, :channel

  alias Tunedin.Accounts

  def join("user:" <> _id, _params, socket) do
    send(self(), :after_join)
    {:ok, %{message: "hello world"}, socket}
  end

  def handle_info(:after_join, %{assigns: %{user_id: user_id}} = socket) do
    user = Accounts.get_user!(user_id)
    # Start long running GenServer process
    # TODO: Refactor to just use 1 genserver
    {:ok, pid} = Tunedin.Accounts.CurrentlyListening.start_link(%{token: user.access_token, id: user.id, prev_song_id: 0})

    # Start channel watcher, used to monitor if user leaves
    :ok = Tunedin.ChannelWatcher.monitor(:users, self(), {__MODULE__, :leave, [pid]})

    {:noreply, assign(socket, :current_pid, pid)}
  end

  def leave(pid) do
    pid |> Tunedin.Accounts.CurrentlyListening.shutdown
  end
end
