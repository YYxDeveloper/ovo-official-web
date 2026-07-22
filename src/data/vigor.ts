import "server-only";
import * as slides from "@/lib/dal/vigor-slides";
import * as services from "@/lib/dal/vigor-services";
import * as partners from "@/lib/dal/vigor-partners";

export type {
  VigorSlide,
  VigorService,
  VigorServiceCategory,
  VigorPartner,
  VigorNavItem,
} from "@/data/vigor-types";
export { VIGOR_NAV_ITEMS, VIGOR_SERVICE_CATEGORIES } from "@/data/vigor-types";

export const getActiveSlides = slides.getActiveSlides;
export const getSlideById = slides.getSlideById;

export const getActiveServices = services.getActiveServices;
export const getServiceById = services.getServiceById;

export const getActivePartners = partners.getActivePartners;
export const getPartnerById = partners.getPartnerById;
