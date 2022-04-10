import React from "react";
import {ReactLocation, Route} from "@tanstack/react-location";
import {Home} from "@internal/component/Home";

export const location = new ReactLocation();

export const routes: Route[] = [
    {
        path: '/',
        element: <Home />,
    },
    // {
    //     path: 'posts',
    //     children: [
    //         {
    //             path: '/',
    //             element: <PostIndex />,
    //         },
    //         {
    //             path: ':postId',
    //             element: <PostDetail />,
    //         },
    //     ],
    // },
];
