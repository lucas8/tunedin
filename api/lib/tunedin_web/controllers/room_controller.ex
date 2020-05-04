defmodule TunedinWeb.RoomController do
  use TunedinWeb, :controller

  alias Tunedin.Shared

  def create(%{assigns: %{current_user: user}} = conn, %{"name" => name}) do
    room_params = %{
      name: name,
      slug: create_slug_of_length()
    }

    case Shared.create_room(user, room_params) do
      {:ok, room} ->
        conn
        |> render("response.json", success: true, message: room.name)
      {:error, _} ->
        conn
        |> put_status(:internal_server_error)
        |> render("response.json", success: true, message: "Creating a room failed")
    end
  end

  defp create_slug_of_length(length \\ 20) do
    :crypto.strong_rand_bytes(length) |> Base.url_encode64 |> binary_part(0, length)
  end
end
