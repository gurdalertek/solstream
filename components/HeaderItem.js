export default function HeaderItem({ Icon, title }) {
  return (
    <div className="flex flex-col items-center cursor-pointer w-12 group sm:w-20 hover:text-[#14F195]">
      <Icon className="h-6 mb-1 group-hover:animate-bounce" />
      <p className="tracking-widest group-hover:opacity-100 opacity-0">
        {title}
      </p>
    </div>
  );
}
