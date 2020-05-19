defmodule TunedinWeb.Presence do
  use Phoenix.Presence, otp_app: :tunedin,
                        pubsub_server: Tunedin.PubSub
end
