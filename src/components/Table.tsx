import { useState } from "react";
import { useUsers } from "../utils/hooks";
import UserMenuDropDown from "./UserMenuDropdown";
import SearchInput from "./SearchInput";
import AddUserModal from "./AddUserModal";
import Pagination from "./Pagination";

export default function Table() {
    const { data: usersData, isPending, error } = useUsers();

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedWebsiteDomain, setSelectedWebsiteDomain] = useState("");
    const [selectedEmailDomain, setSelectedEmailDomain] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const itemsPerPage = 5;

    // unique website domains
    const websiteDomains = [
        ...new Set(usersData?.map((user) => user.website.split(".").pop())),
    ];

    // unique email domains
    const emailDomains = [
        ...new Set(usersData?.map((user) => user.email.split("@").pop())),
    ];

    // Filter users based on search query, website domain, and email domain
    const filteredUsers =
        usersData?.filter((user) => {
            const matchesSearch = user.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            const matchesWebsite = selectedWebsiteDomain
                ? user.website.endsWith(selectedWebsiteDomain)
                : true;
            const matchesEmail = selectedEmailDomain
                ? user.email.endsWith(selectedEmailDomain)
                : true;
            return matchesSearch && matchesWebsite && matchesEmail;
        }) || [];

    // Paginate results
    const totalUsers = filteredUsers.length;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedUsers = filteredUsers.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    if (isPending) {
        return <div className="text-blue-500 mt-5">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 mt-5">Error fetching data ...</div>;
    }

    return (
        <>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <SearchInput onSearch={setSearchQuery} />

                {/* Website Domain Filter */}
                <select
                    className="border px-4 py-2 rounded-md"
                    value={selectedWebsiteDomain}
                    onChange={(e) => setSelectedWebsiteDomain(e.target.value)}
                >
                    <option value="">All Website Domains</option>
                    {websiteDomains.map((domain) => (
                        <option key={domain} value={domain}>
                            {domain}
                        </option>
                    ))}
                </select>

                {/* Email Domain Filter */}
                <select
                    className="border px-4 py-2 rounded-md"
                    value={selectedEmailDomain}
                    onChange={(e) => setSelectedEmailDomain(e.target.value)}
                >
                    <option value="">All Email Domains</option>
                    {emailDomains.map((domain) => (
                        <option key={domain} value={domain}>
                            {domain}
                        </option>
                    ))}
                </select>

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={() => setIsModalOpen(true)}
                >
                    Add new user
                </button>
            </div>

            <table className="w-full border-collapse mt-5 border border-gray-300 text-left text-sm shadow-sm rounded-md">
                <thead>
                    <tr className="h-[4rem]">
                        <th className="px-2 py-3">Name</th>
                        <th className="px-2 py-3">Username</th>
                        <th className="px-2 py-3">Company</th>
                        <th className="px-2 py-3">Email</th>
                        <th className="px-2 py-3">Phone number</th>
                        <th className="px-2 py-3">Website</th>
                        <th scope="col" className="px-2 py-3">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedUsers.length > 0 ? (
                        paginatedUsers.map((data) => (
                            <tr key={data.id}>
                                <td className="px-2 py-3">{data.name}</td>
                                <td className="px-2 py-3">{data.username}</td>
                                <td className="px-6 py-3">
                                    {data.company.name}
                                </td>
                                <td className="px-2 py-3">{data.email}</td>
                                <td className="px-2 py-3">{data.phone}</td>
                                <td className="px-2 py-3">{data.website}</td>
                                <td className="px-6 py-3">
                                    <UserMenuDropDown userInfo={data} />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={7}
                                className="text-center py-4 text-blue-500"
                            >
                                No users found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            {totalUsers > itemsPerPage && (
                <Pagination
                    totalItems={totalUsers}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />
            )}

            {isModalOpen && (
                <AddUserModal closeModal={() => setIsModalOpen(false)} />
            )}
        </>
    );
}
