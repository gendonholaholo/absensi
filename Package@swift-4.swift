// swift-tools-version:4.0
//
//  jogiia-absensi.swift
//  jogiia-absensi
//
//  Created by Gos on 01/04/19.
//  Copyright © 2019 gendonholaholo. All rights reserved.
//

import PackageDescription

let package = Package(
    name: "jogiia-absensi",
    products: [
        .library(
            name: "jogiia-absensi",
            targets: ["jogiia-absensi"]
        ),
    ],
    dependencies: [
        // Dependencies declare other packages that this package depends on.
        // .package(url: /* package url */, from: "1.0.0"),
    ],
    targets: [
        .target(
            name: "jogiia-absensi",
            dependencies: [],
            path: "Sources"
        ),
        .testTarget(
            name: "jogiia-absensiTests",
            dependencies: ["jogiia-absensi"],
            path: "Tests"
        ),
    ],
    swiftLanguageVersions: [4]
)
