import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getStudentsColumns } from "@/data/faculty/studentsColumns";
import { useFacultyAllStudents } from "@/hooks/faculty/students/queries/useFacultyAllStudents";
import { useFacultyOfferingList } from "@/hooks/faculty/students/queries/useFacultyOfferingList";
import { buildStudentFilters } from "@/lib/utils/faculty/buildStudentFilters";
import { handleExport } from "@/lib/utils/faculty/handleExport";
import { FacultyStudent } from "@/types";

type StudentFilters = {
    course: string;
    status: string;
};

const initialFilters: StudentFilters = {
    course: "",
    status: "",
};

export function useStudentsTable() {
    const router = useRouter();
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState<StudentFilters>(initialFilters);
    const [selectedMap, setSelectedMap] = useState<
        Map<string, FacultyStudent & { id: string }>
    >(new Map());

    const { data: offerings } = useFacultyOfferingList();

    const filterConfigs = useMemo(
        () => buildStudentFilters(offerings),
        [offerings],
    );

    const {
        data: studentsData,
        isPending,
        isError,
    } = useFacultyAllStudents({
        offeringId: filters.course || undefined,
        status: filters.status || undefined,
        page: page + 1,
        pageSize: 5,
        search: search || undefined,
    });

    const students = useMemo(() => studentsData?.data ?? [], [studentsData]);
    const totalPages = studentsData?.total_pages ?? 1;

    const columns = useMemo(
        () =>
            getStudentsColumns((id) => {
                router.push(`/faculty/students/${id}`);
            }),
        [router],
    );

    const tableData = useMemo(
        () => ({
            nodes: students.map((s) => ({ ...s, id: s.enrollment_id })),
        }),
        [students],
    );

    function updateFilter(key: string, value: string) {
        setFilters((prev) => ({ ...prev, [key]: value }));
        setPage(0);
    }

    function clearFilters() {
        setFilters(initialFilters);
        setPage(0);
    }

    function updateSearch(value: string) {
        setSearch(value);
        setPage(0);
    }

    function exportSelected(
        selectedNodes: (FacultyStudent & { id: string })[],
    ) {
        handleExport({ nodes: selectedNodes });
    }

    return {
        page,
        setPage,
        search,
        updateSearch,
        filterConfigs,
        filters,
        updateFilter,
        clearFilters,
        selectedMap,
        setSelectedMap,
        isPending,
        isError,
        totalPages,
        columns,
        tableData,
        exportSelected,
    };
}