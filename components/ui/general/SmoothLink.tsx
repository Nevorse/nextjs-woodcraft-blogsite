import { Suspense } from "react";
import Link from "next/link";
import SmoothLinkClient from "./SmoothLinkClient";

type SmoothLinkProps = React.ComponentPropsWithoutRef<typeof Link>;

function Fallback({ href, className, children }: Pick<SmoothLinkProps, "href" | "className" | "children">) {
  return (
    <a href={href.toString()} className={className}>
      {children}
    </a>
  );
}

export default function SmoothLink(props: SmoothLinkProps) {
  return (
    <Suspense fallback={<Fallback href={props.href} className={props.className}>{props.children}</Fallback>}>
      <SmoothLinkClient {...props} />
    </Suspense>
  );
}