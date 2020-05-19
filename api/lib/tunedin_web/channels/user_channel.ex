defmodule TunedinWeb.UserChannel do
  use TunedinWeb, :channel

  alias Tunedin.Accounts

  def join("user:" <> _, _params, socket) do
    send(self(), :after_join)
    {:ok, %{success: true}, socket}
  end

  # TODO: using the plain id as the channel name is unsafe, change this to a token
  def handle_info(:after_join, %{assigns: %{user_id: user_id}} = socket) do
    user = Accounts.get_user!(user_id)

    :ok = Tunedin.Accounts.CurrentlyListening.attach(:currently_listening, user.id, user.access_token)


    # Start channel watcher, used to monitor if user leaves
    :ok = Tunedin.ChannelWatcher.monitor(:users, self(), {__MODULE__, :leave, [user_id]})

    {:noreply, socket}
  end

  def leave(user_id) do
    Tunedin.Accounts.CurrentlyListening.detach(:currently_listening, user_id)
  end
end
