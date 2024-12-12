import { FuseNavigationItem } from '@fuse/components/navigation';

export interface Navigation
{
    allNavigation: {link:string, key:string[]}[];
    default: FuseNavigationItem[];
    // futuristic: FuseNavigationItem[];
    // horizontal: FuseNavigationItem[];
}
