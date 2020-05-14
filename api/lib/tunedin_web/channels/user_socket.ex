defmodule TunedinWeb.UserSocket do
  use Phoenix.Socket
  alias Tunedin.Accounts.Guardian

  channel "user:*", MyApp.UserChannel

  def connect(%{"token" => token}, socket, _conn_info) do
    case Guardian.decode_and_verify(token) do
      {:ok, claims} ->
        {:ok, user} = Guardian.resource_from_claims(claims)
        {:ok, assign(socket, user_id: user.id)}

      {:error, _} ->
        :error
    end
  end

  def connect(_params, _socket, _connect_info) do
    :error
  end

  def id(_socket), do: nil
end
