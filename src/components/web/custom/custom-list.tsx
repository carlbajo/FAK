import Image from "next/image"
export function List({
    name, dateStarted, dateEnded, description, children,
}: {
    name: string,
    dateStarted: Date,
    dateEnded?: Date,
    children: React.ReactNode,
    description?: string
}){
    return(
        <div className="w-full flex items-center gap-4 relative">
            <div className="relative w-10 h-10 opacity-30">
                <Image src="/logo/udd.png" alt="udd" fill/>
            </div>
            <div>
                <h4 className="text-lg">{name}</h4>
                {dateEnded && (
                    <span>{dateEnded.toISOString().slice(0, 4)}</span>
                )}
                <span className="opacity-40">{dateStarted.toISOString().slice(0, 4)}</span>
                {description && <p>{description}</p>}
            </div>
            {/* Dialog */}
            {children}
        </div>
    )
}