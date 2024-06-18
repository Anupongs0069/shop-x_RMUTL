import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

interface NavigationBreadcrumbProps {
    pageLinks: Array<PageLink>;
}

export interface PageLink {
    title: string;
    to: string
    active?: boolean
}

const NavigationBreadcrumb = (props: NavigationBreadcrumbProps) => {
    const { pageLinks } = props;
    return (
        <Breadcrumb className="mt-3">
            {
                pageLinks.map((p, i) => {
                    return <Breadcrumb.Item key={i} linkAs={Link} linkProps={{ to: p.to }} active={p.active}>{p.title}</Breadcrumb.Item>
                })
            }
        </Breadcrumb>
    )
}

export default NavigationBreadcrumb;