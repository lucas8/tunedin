# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :tunedin,
  ecto_repos: [Tunedin.Repo]

# Configures the endpoint
config :tunedin, TunedinWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "NgPjR8/yDX9/aNi7fQysD9KzTb1byqhqQzqH+/i2af1cMo4SkSnkBdyjYCOekDvG",
  render_errors: [view: TunedinWeb.ErrorView, accepts: ~w(json), layout: false],
  pubsub_server: Tunedin.PubSub,
  live_view: [signing_salt: "6F9tXgzz"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
