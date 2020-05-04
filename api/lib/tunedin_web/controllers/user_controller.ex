defmodule TunedinWeb.UserController do
  use TunedinWeb, :controller

  plug Guardian.Plug.EnsureAuthenticated

  def me(conn, _params) do
    user = Guardian.Plug.current_resource(conn)

    display_user = %{
      id: user.id,
      username: user.username,
      email: user.email,
      avatar_url: user.avatar_url
    }

      render(conn, "response.json", success: true, message: display_user)
  end
end
