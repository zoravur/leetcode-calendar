#include <iostream>
#include <vector>

using namespace std;

void print_vector(vector<int>& v) {
    if (v.empty()) {
        std::cout << "(empty)";
    } else {
        for (int i = 0; i < v.size(); ++i) {
            std::cout << v[i] << " ";
        }
    }
    std::cout << std::endl;
}

class UnionFind {
    vector<int> parent_;
    vector<int> size_;

public:
    UnionFind(int n): parent_(n), size_(n) {
        for (int i = 0; i < n; ++i) {
            parent_[i] = i;
            size_[i] = 1;
        }
    }

    int parent_find(int v) {
        if (v == parent_[v]) {
            return v;
        }
        return parent_[v] = parent_find(parent_[v]);
    }

    void merge(int a, int b) {
        a = parent_find(a);
        b = parent_find(b);

        if (a != b) {
            if (size_[b] > size_[a]) {
                swap(a, b);
            }
            parent_[b] = a;
            size_[a] += size_[b];
        }
    }

    void debug() {
        print_vector(parent_);
        print_vector(size_);
    }
};


vector<int> findRedundantConnection(vector<vector<int>>& edges) {

    int n = edges.size()+1;

    UnionFind u(n);

    for (int i = 0; i < edges.size(); ++i) {
        if (u.parent_find(edges[i][0]) == u.parent_find(edges[i][1])) {
            return edges[i];
        }
        u.merge(edges[i][0], edges[i][1]);
        u.debug();
    }

    return {};
}

int main() {
    vector<vector<int>> edges{{1,2},{1,3},{1,4},{3,4},{4,5}};

    auto result = findRedundantConnection(edges);

    print_vector(result);
}
