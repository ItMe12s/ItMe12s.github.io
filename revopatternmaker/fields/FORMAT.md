Fields are counted in 'studs by studs' and not 'flowers by flowers'
Each flowers are 4 studs.
The default field orientation is facing away from the hive.

The walls dictate if that side of the field have collisions.
For example: If the left wall is set to true then you can't walk out of the field's left edge,
But if the right wall is set to false you can leave the field on the right side.

The walls offset is the distance between the flower's edge to the wall on that side in studs unit,
For example: If the left wall have 0 offset value then it's flushed against the field,
But if the top wall have 11 studs of studs offset then it's 2.75 flowers away from the field top edge.

Json format:
{
    "name": "string",
    "measurements": {
        "x": int,
        "y": int
    },
    "walls_enabled": {
        "top": bool,
        "bottom": bool,
        "left": bool,
        "right": bool
    },
    "walls_offset": {
        "top": float,
        "bottom": float,
        "left": float,
        "right": float
    }
}