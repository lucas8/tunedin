defmodule Tunedin.Repo.Migrations.CreateChannels do
  use Ecto.Migration

  def change do
    create table(:channels) do
      add :slug, :string
      add :user_id, references(:users, on_delete: :delete_all)

      timestamps()
    end

    create index(:channels, [:user_id])
    create unique_index(:channels, [:slug])
  end
end
