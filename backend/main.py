from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict

app = FastAPI()

# Allow CORS from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend origin in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: dict

class Edge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: str = None
    targetHandle: str = None

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.post("/pipelines/parse")
async def parse_pipeline(pipeline: Pipeline):
    node_ids = {node.id for node in pipeline.nodes}
    adjacency_list = {node_id: [] for node_id in node_ids}

    for edge in pipeline.edges:
        if edge.source in node_ids and edge.target in node_ids:
            adjacency_list[edge.source].append(edge.target)

    # DAG check using DFS
    visited = set()
    rec_stack = set()

    def is_cyclic(v):
        visited.add(v)
        rec_stack.add(v)
        for neighbor in adjacency_list.get(v, []):
            if neighbor not in visited:
                if is_cyclic(neighbor):
                    return True
            elif neighbor in rec_stack:
                return True
        rec_stack.remove(v)
        return False

    is_dag = True
    for node in node_ids:
        if node not in visited:
            if is_cyclic(node):
                is_dag = False
                break

    return {
        "num_nodes": len(pipeline.nodes),
        "num_edges": len(pipeline.edges),
        "is_dag": is_dag
    }
