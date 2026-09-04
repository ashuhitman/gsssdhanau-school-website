// import Image from "next/image";

// import { Newsletter } from "@/lib/data/newsletter";

// interface NewsletterClubPageProps {
//     newsletter: Newsletter;
// }

// export function NewsletterClubPage({
//     newsletter,
// }: NewsletterClubPageProps) {
//     return (
//         <div>
//             <div>
//                 <p
//                     className="
//                         text-sm
//                         font-semibold
//                         uppercase
//                         tracking-[0.18em]
//                         text-[var(--school-primary)]
//                     "
//                 >
//                     Our Team
//                 </p>

//                 <h2
//                     className="
//                         mt-3
//                         text-4xl
//                         font-bold
//                         tracking-tight
//                         text-[var(--school-heading)]
//                     "
//                 >
//                     The People Behind the Issue
//                 </h2>
//             </div>

//             {newsletter.clubMembers.length > 0 ? (
//                 <div
//                     className="
//                         mt-10
//                         grid
//                         gap-6
//                         sm:grid-cols-2
//                         lg:grid-cols-3
//                     "
//                 >
//                     {newsletter.clubMembers.map(
//                         (member) => (
//                             <article
//                                 key={member.id}
//                                 className="
//                                     rounded-2xl
//                                     border
//                                     border-[var(--school-border)]
//                                     bg-[var(--school-card)]
//                                     p-5
//                                 "
//                             >
//                                 <div
//                                     className="
//                                         flex
//                                         items-center
//                                         gap-4
//                                     "
//                                 >
//                                     <div
//                                         className="
//                                             relative
//                                             h-16
//                                             w-16
//                                             shrink-0
//                                             overflow-hidden
//                                             rounded-full
//                                             bg-[var(--school-surface)]
//                                         "
//                                     >
//                                         {member.image && (
//                                             <Image
//                                                 src={
//                                                     member.image
//                                                 }
//                                                 alt={
//                                                     member.name
//                                                 }
//                                                 fill
//                                                 className="object-cover"
//                                                 sizes="4rem"
//                                             />
//                                         )}
//                                     </div>

//                                     <div className="min-w-0">
//                                         <h3
//                                             className="
//                                                 font-bold
//                                                 text-[var(--school-heading)]
//                                             "
//                                         >
//                                             {member.name}
//                                         </h3>

//                                         {member.role && (
//                                             <p
//                                                 className="
//                                                     mt-1
//                                                     text-sm
//                                                     font-medium
//                                                     text-[var(--school-primary)]
//                                                 "
//                                             >
//                                                 {member.role}
//                                             </p>
//                                         )}

//                                         {member.className && (
//                                             <p
//                                                 className="
//                                                     mt-1
//                                                     text-xs
//                                                     text-[var(--school-muted)]
//                                                 "
//                                             >
//                                                 {
//                                                     member.className
//                                                 }
//                                             </p>
//                                         )}
//                                     </div>
//                                 </div>
//                             </article>
//                         )
//                     )}
//                 </div>
//             ) : (
//                 <div
//                     className="
//                         mt-10
//                         rounded-2xl
//                         border
//                         border-[var(--school-border)]
//                         bg-[var(--school-surface)]
//                         px-6
//                         py-12
//                         text-center
//                     "
//                 >
//                     <p
//                         className="
//                             text-sm
//                             text-[var(--school-muted)]
//                         "
//                     >
//                         Newsletter club members
//                         have not been listed for
//                         this issue.
//                     </p>
//                 </div>
//             )}
//         </div>
//     );
// }