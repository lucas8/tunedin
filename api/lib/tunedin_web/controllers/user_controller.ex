defmodule TunedinWeb.UserController do
  use TunedinWeb, :controller

  plug TunedinWeb.Plugs.AuthUser

  def me(%{assigns: %{current_user: user}} = conn, _params) do
      display_user = %{
        id: user.id,
        username: user.username,
        email: user.email,
        avatar_url: user.avatar_url
      }

      render(conn, "response.json", success: true, message: display_user)
  end
end
