defmodule TunedinWeb.UserController do
  use TunedinWeb, :controller

  def index(conn, _params) do
    conn
    |> render("test.json", message: "Hello World")
  end
end
