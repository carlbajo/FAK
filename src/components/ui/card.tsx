import { cn } from "@/lib/utils";

interface CardInterface extends React.ComponentPropsWithoutRef<"div">{};
interface CardH3 extends React.ComponentPropsWithoutRef<"h3">{};
interface CardP extends React.ComponentPropsWithoutRef<"p">{};

export const Card:React.FC<CardInterface> = ({
    className, ...props
}) => (
    <div className={cn(
        "relative rounded-lg text-card-foreground shadow-sm",
        className,
    )}{...props}/>
)

export const CardHeader:React.FC<CardInterface> = ({
    className, ...props
}) => (
    <div className={cn(
        "flex flex-col space-y-1.5 p-6", className
    )}{...props}/>
);

export const CardTitle:React.FC<CardH3> = ({
    className, ...props
}) => (
    <h3 className={cn(
        "text-2xl font-semibold leading-none tracking-tight", className
    )}{...props}/>
);

export const CardDescription:React.FC<CardP> = ({
    className, ...props
}) => (
    <p className={cn(
        "text-sm text-muted-foreground", className
    )}{...props}/>
);

export const CardContent:React.FC<CardInterface> = ({
    className, ...props
}) => (
    <div className={cn(
        "p-6 pt-0", className
    )}{...props}/>
);

export const CardFooter:React.FC<CardInterface> = ({
    className, ...props
}) => (
    <div className={cn(
        "flex items-center p-6 pt-0", className
    )}{...props}/>
);


Card.displayName = "Card";
CardHeader.displayName = "CardHeader";
CardTitle.displayName = "CardTitle";
CardDescription.displayName = "CardDescription";
CardContent.displayName = "CardContent";
CardFooter.displayName = "CardFooter";