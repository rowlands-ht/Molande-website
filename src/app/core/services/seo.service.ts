import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

/** Call seo.set() in every page: sets <title>, description, Open Graph, Twitter card, canonical. */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private doc = inject(DOCUMENT);
  private origin = 'https://www.molande.co.zw'; // change to your domain

  set(page: string, description: string, image = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200') {
    const full = `${page} | MOLANDE Construction, Harare`;
    this.title.setTitle(full);
    const tags: Record<string, string> = {
      description, 'og:title': full, 'og:description': description, 'og:type': 'website',
      'og:image': image, 'og:locale': 'en_ZW', 'twitter:card': 'summary_large_image',
    };
    for (const [k, v] of Object.entries(tags)) {
      const attr = k.startsWith('og:') ? 'property' : 'name';
      this.meta.updateTag({ [attr]: k, content: v });
    }
    let link = this.doc.querySelector<HTMLLinkElement>('link[rel=canonical]');
    if (!link) { link = this.doc.createElement('link'); link.rel = 'canonical'; this.doc.head.appendChild(link); }
    link.href = this.origin + (this.doc.location?.pathname ?? '/');
  }
}
