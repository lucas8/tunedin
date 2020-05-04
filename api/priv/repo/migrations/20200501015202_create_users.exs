defmodule Tunedin.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :access_token, :string
      add :refresh_token, :string
      add :expiry, :integer
      add :username, :string, size: 30
      add :email, :string
      add :avatar_url, :string, null: true

      timestamps()
    end

    create unique_index(:users, [:username])
    create unique_index(:users, [:email])
  end
end
