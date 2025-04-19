import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const EventCard = ({ event }) => {
  return (
    <Link href={`/events/${event.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:scale-[1.02] hover:shadow-lg">
        <div className="relative h-48">
          <Image
            src={event.image || "/placeholder-event.jpg"}
            alt={event.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
            {event.type}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 line-clamp-1">{event.title}</h3>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <FaCalendarAlt className="mr-1" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 mb-3">
            <FaMapMarkerAlt className="mr-1" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-blue-600">{event.price}</span>
            <span className="text-xs text-gray-500">{event.tags ? event.tags[0] : ''}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;