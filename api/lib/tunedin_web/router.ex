defmodule TunedinWeb.Router do
  use TunedinWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_session
    plug Tunedin.Accounts.Pipeline
  end

  scope "/api", TunedinWeb do
    pipe_through :api

    get "/music/search", MusicController, :search
    get "/music/recent", MusicController, :recent
    get "/music/refresh", MusicController, :refresh

    get "/users/me", UserController, :me
    get "/users/token", UserController, :token

    post "/channels/new", ChannelController, :create
  end

  scope "/auth", TunedinWeb do
    pipe_through :browser

    get "/signout", SessionController, :delete
    get "/:provider", SessionController, :request
    get "/:provider/callback", SessionController, :create
    get "/:provider/get", SessionController, :get
  end
  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through [:fetch_session, :protect_from_forgery]
      live_dashboard "/dashboard", metrics: TunedinWeb.Telemetry
    end
  end
end
