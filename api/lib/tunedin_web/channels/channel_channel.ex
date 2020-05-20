defmodule TunedinWeb.ChannelChannel do
  use TunedinWeb, :channel

  alias TunedinWeb.Presence
  alias Tunedin.Accounts
  alias Tunedin.Music
  alias Tunedin.Repo

  def join("channel:" <> channel_slug, _params, socket) do
    case Music.get_channel_by_slug(channel_slug) do
      nil ->
        {:error, %{reason: "Channel not found"}}

      channel ->
        channel = Repo.preload(channel, :user)
        user_template = %{
          id: channel.user.id,
          username: channel.user.username,
        }
        send(self(), :after_join)
        {:ok, %{success: true, owner: user_template},assign(socket, :channel, channel)}
    end
  end

  def handle_info(:after_join, socket) do
      # Pushes metadata list for socket
      push(socket, "presence_state", Presence.list(socket))

      user = get_user(socket)

      is_dj =  if (socket.assigns[:channel].user_id == user.id), do: true, else: false

      {:ok, _} = Presence.track(socket, "user:#{user.id}", %{
        is_dj: is_dj,
        user_id: user.id,
        username: user.username,
        avatar_url: user.avatar_url,
      })

      {:noreply, socket}
  end

  def get_user(socket) do
    Accounts.get_user!(socket.assigns[:user_id])
  end
end
