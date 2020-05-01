defmodule Tunedin.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :access_token, :string
      add :refresh_token, :string
      add :expiry, :string
      add :username, :string, size: 30

      timestamps()
    end

    create unique_index(:users, [:username])
  end
end
