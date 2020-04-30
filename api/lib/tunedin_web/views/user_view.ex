defmodule TunedinWeb.UserView do
  use TunedinWeb, :view

  def render("test.json", %{message: message}) do
    %{
      message: message
    }
  end
end
