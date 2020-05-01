defmodule TunedinWeb.SessionController do
  use TunedinWeb, :controller
  plug Ueberauth

  def create(%{assigns: %{uberauth_assigns: auth}} = conn, %{"provider" => provider}) do
    IO.inspect(auth)
    IO.puts(provider)

    conn
  end
end
