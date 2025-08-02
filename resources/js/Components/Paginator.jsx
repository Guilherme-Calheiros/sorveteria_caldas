import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from "./ui/pagination";

export default function Paginator({ items }) {
    const { current_page, last_page, prev_page_url, next_page_url } = items;

    const generatePageLinks = () => {
        const pages = [];
        const maxVisible = 5;
        let start = Math.max(1, current_page - 2);
        let end = Math.min(last_page, current_page + 2);

        if (current_page <= 3) {
            end = Math.min(last_page, maxVisible);
        }

        if (current_page >= last_page - 2) {
            start = Math.max(1, last_page - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    const pageLinks = generatePageLinks();

    if (last_page <= 1) {
        return null;
    }

    return (
        <div className="mt-4">
            <Pagination className="justify-start">
                <PaginationContent>
                    {current_page > 1 && (
                        <>
                            <PaginationItem>
                                <PaginationPrevious href={prev_page_url} />
                            </PaginationItem>
                        </>
                    )}

                    {pageLinks[0] > 1 && (
                        <>
                            <PaginationItem>
                                <PaginationLink href={`?page=1`}>1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        </>
                    )}

                    {pageLinks.map((page) => (
                        <PaginationItem key={page}>
                            <PaginationLink
                                isActive={page === current_page}
                                href={`?page=${page}`}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    {pageLinks[pageLinks.length - 1] < last_page && (
                        <>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href={`?page=${last_page}`}>
                                    {last_page}
                                </PaginationLink>
                            </PaginationItem>
                        </>
                    )}

                    {current_page < last_page && (
                        <>
                            <PaginationItem>
                                <PaginationNext href={next_page_url} />
                            </PaginationItem>
                        </>
                    )}
                </PaginationContent>
            </Pagination>
        </div>
    );
}
