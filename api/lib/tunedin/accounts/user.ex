defmodule Tunedin.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :access_token, :string
    field :expiry, :string
    field :refresh_token, :string
    field :username, :string

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:access_token, :refresh_token, :expiry, :username])
    |> validate_required([:access_token, :refresh_token, :expiry, :username])
    |> unique_constraint([:username])
    |> validate_length(:username, max: 30)
  end
end
