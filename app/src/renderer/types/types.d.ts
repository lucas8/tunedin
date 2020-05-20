export interface User {
    id: number;
    username: string;
    email: string;
    avatar_url: string;
}

export interface APIResponse<T> {
    success: boolean;
    message: T;
}

export interface Image {
    height: number;
    width: number;
    url: string;
}

export interface Artist {
    name: string;
    type: string;
    id: string;
}

export interface Album {
    album_type: string;
    artists: Artist[];
    id: string;
    images: Image[];
    name: string;
    type: string;
}

export interface Track {
    album: Album;
    name: string;
    artists: Artist[];
    duration_ms: number;
    explicit: boolean;
    type: string;
    id: string;
}

export interface Channel {
    id: string;
    slug: string;
}

// Hook types

export interface ReducerAction {
    event: any;
    payload: any;
}
