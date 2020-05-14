defmodule TunedinWeb.MusicController do
  use TunedinWeb, :controller

  alias Tunedin.Accounts

  plug Guardian.Plug.EnsureAuthenticated

  @base_url "https://api.spotify.com/v1"
  @account_url "https://accounts.spotify.com/api"

  def search(conn, %{"q" => q}) do
    user = Guardian.Plug.current_resource(conn)
    headers = [{"Authorization", "Bearer #{user.access_token}"}]

    case HTTPoison.get("#{@base_url}/search?q=#{q}&type=track", headers) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        {:ok, %{"tracks" => %{"items" => items}}} = Poison.decode(body)
        render(conn, "response.json", success: true, message: items)

      {:ok, %HTTPoison.Response{status_code: 401}} ->
        refresh_token(conn, user)

      {:ok, _} ->
        conn
        |> put_status(:internal_server_error)
        |> render("response.json", success: false, message: "Unhanded error, try again later.")
    end
  end

  def recent(conn, _params) do
    user = Guardian.Plug.current_resource(conn)
    headers = [{"Authorization", "Bearer #{user.access_token}"}]
    params = [{"limit", 10}]

    case HTTPoison.get("#{@base_url}/me/player/recently-played", headers, params: params) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        {:ok, %{"items" => cursors}} = Poison.decode(body)
        render(conn, "response.json", success: true, message: cursors)

      {:ok, %HTTPoison.Response{status_code: 401}} ->
        refresh_token(conn, user)

      {:ok, _} ->
        conn
        |> put_status(:internal_server_error)
        |> render("response.json", success: false, message: "Unhanded error, try again later.")
    end
  end

  defp refresh_token(conn, user) do
    auth = Base.encode64("#{System.get_env("SPOTIFY_CLIENT_ID")}:#{System.get_env("SPOTIFY_CLIENT_SECRET")}")
    headers = [{"Authorization", "Basic #{auth}"}, {"Content-Type", "application/x-www-form-urlencoded"}]
    req_body = URI.encode_query(%{grant_type: "refresh_token", refresh_token: user.refresh_token})

    case HTTPoison.post("#{@account_url}/token", req_body, headers, []) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
        {:ok, %{"access_token" => access_token}} = Poison.decode(body)
        {:ok, _} = Accounts.update_user(user, %{access_token: access_token})

        render(conn, "response.json", success: false, message: "Successfully refreshed access token, try again.")

      {:ok, _} ->
        conn
        |> put_status(:unauthorized)
        |> render("response.json", success: false, message: "Failed trying to refetch access_token, try again later.")
    end
  end
end
