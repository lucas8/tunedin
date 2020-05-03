defmodule TunedinWeb.MusicController do
  use TunedinWeb, :controller

  @base_url "https://api.spotify.com/v1"

  def search(%{assigns: %{current_user: user}} = conn, %{"q" => q}) do
    headers = [{"Authorization", "Bearer #{user.access_token}"}]
    params = []

    # TODO: Search only limited to tracks, expand to artists and playlists in the future
    case HTTPoison.get("#{@base_url}/search?q=#{q}&type=track", headers, params: params) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        {:ok, %{"tracks" => %{"items" => items}}} = Poison.decode(body)
        render(conn, "response.json", success: true, message: items)

      {:ok, %HTTPoison.Response{status_code: 401}} ->
        # TODO: Fetch new access token
        render(conn, "response.json", success: false, message: "An error has occured, try agagin later.")
    end
  end
end
