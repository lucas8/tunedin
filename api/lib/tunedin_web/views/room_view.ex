defmodule TunedinWeb.RoomView do
  use TunedinWeb, :view

  def render("response.json", %{success: success, message: message}) do
    %{
      success: success,
      message: message
    }
  end
end
