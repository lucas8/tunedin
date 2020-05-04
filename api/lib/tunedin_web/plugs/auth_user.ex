defmodule TunedinWeb.Plugs.AuthUser do
  import Plug.Conn

  import Phoenix.Controller

  def init(_) do
  end

  def call(conn, _params) do
    if conn.assigns.signed_in? do
      conn
    else
      conn
      |> put_status(:unauthorized)
      |> render("response.json", success: false, message: "You must be logged in to complete this action.")
      |> halt()
    end
  end
end
