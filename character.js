// 角色

import { Edge } from './edge.js';
import * as THREE from './build/three.module.js';

export class Character {
    constructor(scene, file_path, line_amount, color_hex) {
        this.eye_edges = [];
        // 0~3 是左眼的邊框 0是下方 1是左側 2是上方 3是右側
        // 4~7 是右眼的邊框 4是下方 5是左側 6是上方 7是右側
        for (let i = 0; i < line_amount * 2; i++) {
            this.eye_edges[i] = new Edge(color_hex[i]);
            scene.add(this.eye_edges[i].line);
        }

        // this.mesh
        this.file_path = file_path;
    }

    set_Line_Points(edge_now, point1, point2) {
        this.eye_edges[edge_now].set_Line_Points(point1, point2);
    }

    left_copy_to_right(line_amount) {
        let temp_Vector3 = [];
        for (let i = line_amount; i < line_amount * 2; i++) {
            temp_Vector3[0] = new THREE.Vector3().copy(this.eye_edges[i - line_amount].points[0]);
            temp_Vector3[1] = new THREE.Vector3().copy(this.eye_edges[i - line_amount].points[1]);


            temp_Vector3[0].setX(-temp_Vector3[0].x);
            temp_Vector3[1].setX(-temp_Vector3[1].x);

            this.eye_edges[i].set_Line_Points(temp_Vector3[0], temp_Vector3[1]);

            // console.log("1:" + this.eye_edges[i - line_amount].points[0].x + "2:" + this.eye_edges[i - line_amount].points[1].x);
        }
    }
}