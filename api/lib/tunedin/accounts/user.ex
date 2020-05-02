defmodule Tunedin.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :access_token, :string
    field :expiry, :integer
    field :refresh_token, :string
    field :username, :string
    field :email, :string
    field :avatar_url, :string

    has_many :rooms, Tunedin.Shared.Room

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:access_token, :refresh_token, :expiry, :username, :email, :avatar_url])
    |> validate_required([:access_token, :refresh_token, :expiry, :username])
    |> unique_constraint([:username, :email])
    |> validate_length(:username, max: 30)
  end
end
