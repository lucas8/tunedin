defmodule Tunedin.Shared.Room do
  use Ecto.Schema
  import Ecto.Changeset

  schema "rooms" do
    field :slug, :string
    field :name, :string

    belongs_to :user, Tunedin.Accounts.User

    timestamps()
  end

  @doc false
  def changeset(room, attrs) do
    room
    |> cast(attrs, [:slug, :name])
    |> validate_required([:slug])
    |> unique_constraint(:slug)
  end
end
