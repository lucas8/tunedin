defmodule TunedinWeb.ChannelController do
  use TunedinWeb, :controller

  alias Tunedin.Music

  def create(conn, _params) do
    user = Guardian.Plug.current_resource(conn)
    channel_params = %{
      slug: create_slug_of_length()
    }

    case Music.insert_or_update_channel(user, channel_params) do
      {:ok, channel} ->
        conn
        |> render("response.json", success: true, message: %{id: channel.id, slug: channel.slug})
      {:error, _} ->
        conn
        |> put_status(:internal_server_error)
        |> render("response.json", success: false, message: "Creating a channel failed.")
    end
  end

  defp create_slug_of_length(length \\ 20) do
    :crypto.strong_rand_bytes(length) |> Base.url_encode64 |> binary_part(0, length)
  end
end
