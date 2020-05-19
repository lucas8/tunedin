defmodule Tunedin.Music.Channel do
  use Ecto.Schema
  import Ecto.Changeset

  schema "channels" do
    field :slug, :string

    belongs_to :user, Tunedin.Accounts.User

    timestamps()
  end

  @doc false
  def changeset(channel, attrs) do
    channel
    |> cast(attrs, [:slug])
    |> validate_required([:slug])
    |> unique_constraint(:slug)
  end
end
