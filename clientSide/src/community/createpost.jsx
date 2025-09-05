// import React from 'react'
// import { IoMdImage, IoMdLink } from "react-icons/io";
// import { IoText } from "react-icons/io5";
// import { MdPreview } from "react-icons/md";
// import User1 from '../../assets/user/user1.svg'
// import User2 from '../../assets/user/user2.svg'
// import User3 from '../../assets/user/user3.svg'
// import User4 from '../../assets/user/user4.svg'
// import User5 from '../../assets/user/user5.svg'
// import User6 from '../../assets/user/user6.svg'

// export default function Createpost({ handleSubmit, formData ,setFormData}) {
//   return (
//     <>
//     <form onSubmit={(e)=>handleSubmit(e)}>
//       <div className='w-full'>
//         <h3 className='font-semibold text-lg mt-5 '></h3>
//         <div>
//           <div className='flex flex-col sm:flex-row sm:gap-x-9  mb-3 gap-3'>
//             <input className='sm:w-full border rounded-md outline-black  border-black p-2 text-lg' value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder='आफ्नो नाम' type="text" name="Name" id="name" />
//             <input className='sm:w-full border rounded-md  outline-black border-black p-2 text-lg' value={formData.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder='आफ्नो ईमेल' type="text" name="email" id="email" />
//           </div>
//           <textarea id="message" rows="4" class="block outline-black p-2.5 w-full text-lg   rounded-lg border border-fourth  " placeholder="तपाईंको प्रश्न के हो?..." value={formData.problem}
//             onChange={(e) => setFormData({ ...formData, problem: e.target.value })}></textarea>
//             <p className='m-2 p-2'>यो विशेषज्ञ मध्ये एकलाई पठाउनुहोस्।</p>
//           <div className='flex justify-between'>
//             <div className='sm:flex space-x-10 m-2 hidden'>
//              <button><img src={User1} alt="" /> Ram </button>
//              <button><img src={User2} alt="" /> Ram</button>
//              <button><img src={User3} alt="" /> Ram</button>
//              <button><img src={User4} alt="" /> Ram</button>
//              <button><img src={User5} alt="" /> Ram</button>
//              <button><img src={User6} alt="" /> Ram</button>
//             </div>

//           </div>
//         </div>
//       </div>
//       </form>
//       <hr />
//     </>
//   )
// }
