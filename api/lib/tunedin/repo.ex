defmodule Tunedin.Repo do
  use Ecto.Repo,
    otp_app: :tunedin,
    adapter: Ecto.Adapters.Postgres
end
