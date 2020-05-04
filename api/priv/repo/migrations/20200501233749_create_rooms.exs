defmodule Tunedin.Repo.Migrations.CreateRooms do
  use Ecto.Migration

  def change do
    create table(:rooms) do
      add :slug, :string
      add :user_id, references(:users, on_delete: :delete_all)
      add :name, :string

      timestamps()
    end

    create unique_index(:rooms, [:slug])
    create index(:rooms, [:user_id])
  end
end
