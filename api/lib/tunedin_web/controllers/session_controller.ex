defmodule TunedinWeb.SessionController do
  use TunedinWeb, :controller
  plug Ueberauth

  alias Tunedin.Accounts
  alias Tunedin.Accounts.User

  def create(%{assigns: %{ueberauth_auth: auth}} = conn, _params) do
    user_params = %{
      access_token: auth.credentials.token,
      expiry: auth.credentials.expires_at,
      username: auth.info.nickname,
      avatar_url: auth.info.image,
      email: auth.info.email,
      refresh_token: auth.credentials.refresh_token
    }

    changeset = User.changeset(%User{}, user_params)

    case Accounts.insert_or_update_user(changeset) do
      {:ok, user} ->
        conn
        |> Plug.Conn.put_session(:user_id, user.id)
        |> render("response.json", success: true, message: "Successfully logged in.")

      {:error, _} ->
        conn
        |> render("response.json", success: false, message: "An error occued while logging in.")
    end
  end

  def delete(conn, _params) do
    conn
    |> Accounts.sign_out()
    |> render("response.json", success: true, message: "Successfully logged out.")
  end
end
