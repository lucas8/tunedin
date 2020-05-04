defmodule Tunedin.SharedTest do
  use Tunedin.DataCase

  alias Tunedin.Shared

  describe "rooms" do
    alias Tunedin.Shared.Room

    @valid_attrs %{slug: "some slug"}
    @update_attrs %{slug: "some updated slug"}
    @invalid_attrs %{slug: nil}

    def room_fixture(attrs \\ %{}) do
      {:ok, room} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Shared.create_room()

      room
    end

    test "list_rooms/0 returns all rooms" do
      room = room_fixture()
      assert Shared.list_rooms() == [room]
    end

    test "get_room!/1 returns the room with given id" do
      room = room_fixture()
      assert Shared.get_room!(room.id) == room
    end

    test "create_room/1 with valid data creates a room" do
      assert {:ok, %Room{} = room} = Shared.create_room(@valid_attrs)
      assert room.slug == "some slug"
    end

    test "create_room/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Shared.create_room(@invalid_attrs)
    end

    test "update_room/2 with valid data updates the room" do
      room = room_fixture()
      assert {:ok, %Room{} = room} = Shared.update_room(room, @update_attrs)
      assert room.slug == "some updated slug"
    end

    test "update_room/2 with invalid data returns error changeset" do
      room = room_fixture()
      assert {:error, %Ecto.Changeset{}} = Shared.update_room(room, @invalid_attrs)
      assert room == Shared.get_room!(room.id)
    end

    test "delete_room/1 deletes the room" do
      room = room_fixture()
      assert {:ok, %Room{}} = Shared.delete_room(room)
      assert_raise Ecto.NoResultsError, fn -> Shared.get_room!(room.id) end
    end

    test "change_room/1 returns a room changeset" do
      room = room_fixture()
      assert %Ecto.Changeset{} = Shared.change_room(room)
    end
  end
end
