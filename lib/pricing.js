import {
  fixtureTypes,
  v2AluminumColors,
  pathwayFixtures,
  wallWasherFixtures,
  deckLightFixtures,
  treeFocusOptions,
  lightingServices,
} from '@/components/consultation/formData';

/**
 * Resolves per-unit upcharge from raw service config.
 * Returns { pricePerUnit: number | null, fixtureLabel: string }
 *
 * When pricePerUnit is null, Drake enters pricing manually in the proposal builder.
 */
export function resolvePricing(configType, rawConfig) {
  if (!rawConfig || !configType) {
    return { pricePerUnit: null, fixtureLabel: '' };
  }

  switch (configType) {
    case 'fixture': {
      const fixture = fixtureTypes.find((f) => f.id === rawConfig.fixtureType);
      if (!fixture || !fixture.basePrice) return { pricePerUnit: null, fixtureLabel: '' };

      const fixtureLabel = fixture.shortName;
      const base = fixture.basePrice;

      if (rawConfig.finish === 'aluminum' || rawConfig.finish === 'artisan-brass' || rawConfig.finish === 'raw-brass' || rawConfig.finish === 'solid-brass') {
        const finish = fixture.finishes.find((f) => f.id === rawConfig.finish);
        if (!finish) return { pricePerUnit: null, fixtureLabel };

        if (finish.hasColorOptions && rawConfig.aluminumColor) {
          const colorOption = finish.colorOptions.find((c) => c.id === rawConfig.aluminumColor);
          const upcharge = colorOption?.upcharge ?? finish.upcharge ?? 0;
          return { pricePerUnit: base + upcharge, fixtureLabel };
        }

        return { pricePerUnit: base + (finish.upcharge ?? 0), fixtureLabel };
      }

      return { pricePerUnit: null, fixtureLabel };
    }

    case 'pathway': {
      const pathFixture = pathwayFixtures.find((f) => f.id === rawConfig.fixtureType);
      if (!pathFixture || !rawConfig.finish) return { pricePerUnit: null, fixtureLabel: '' };
      const finishId = rawConfig.finish.replace(`${rawConfig.fixtureType}-`, '');
      const allFinishes = [...pathFixture.finishes.brass, ...pathFixture.finishes.aluminum];
      const finish = allFinishes.find((f) => f.id === finishId);
      return {
        pricePerUnit: finish ? pathFixture.basePrice + (finish.upcharge ?? 0) : null,
        fixtureLabel: finish ? `${pathFixture.name} · ${finish.name}` : '',
      };
    }

    case 'tree': {
      const treeSvc = lightingServices.find((s) => s.id === 'tree');
      return { pricePerUnit: treeSvc?.basePrice ?? null, fixtureLabel: '' };
    }

    case 'specialty': {
      const selectedWW = wallWasherFixtures.find((f) => f.id === rawConfig.fixtureType);
      if (!selectedWW || !rawConfig.finish) return { pricePerUnit: null, fixtureLabel: selectedWW?.name ?? '' };
      const finishId = rawConfig.finish.replace(`${rawConfig.fixtureType}-`, '');
      const allWWFinishes = [...selectedWW.finishes.brass, ...selectedWW.finishes.aluminum];
      const wwFinish = allWWFinishes.find((f) => f.id === finishId);
      const wwBase = selectedWW.basePrice ?? 0;
      return {
        pricePerUnit: wwFinish ? wwBase + (wwFinish.upcharge ?? 0) : null,
        fixtureLabel: `${selectedWW.name} · ${wwFinish?.name ?? ''}`,
      };
    }

    case 'deck-fixture': {
      const selectedDL = deckLightFixtures.find((f) => f.id === rawConfig.fixtureType);
      if (!selectedDL || !rawConfig.finish) return { pricePerUnit: null, fixtureLabel: selectedDL?.name ?? '' };
      const dlFinishId = rawConfig.finish.replace(`${rawConfig.fixtureType}-`, '');
      const allDLFinishes = [...selectedDL.finishes.brass, ...selectedDL.finishes.aluminum];
      const dlFinish = allDLFinishes.find((f) => f.id === dlFinishId);
      const dlBase = selectedDL.basePrice ?? 0;
      return {
        pricePerUnit: dlFinish ? dlBase + (dlFinish.upcharge ?? 0) : null,
        fixtureLabel: `${selectedDL.name} · ${dlFinish?.name ?? ''}`,
      };
    }

    case 'color-only': {
      if (rawConfig.aluminumColor) {
        const color = v2AluminumColors.find((c) => c.id === rawConfig.aluminumColor);
        /* color-only uses V2 integrated base price */
        const v2 = fixtureTypes.find((f) => f.id === 'v2-integrated');
        const base = v2?.basePrice ?? 0;
        return {
          pricePerUnit: color ? base + (color.upcharge ?? 0) : null,
          fixtureLabel: color?.name ?? '',
        };
      }
      return { pricePerUnit: null, fixtureLabel: '' };
    }

    case 'none':
      return { pricePerUnit: null, fixtureLabel: '' };

    default:
      return { pricePerUnit: null, fixtureLabel: '' };
  }
}

/**
 * Resolves the product photo for a customer's selected finish/config.
 * Returns { photo, label, whiteBg } or null.
 */
export function resolveFinishPhoto(configType, rawConfig) {
  if (!rawConfig || !configType) return null;

  switch (configType) {
    case 'fixture': {
      const fixture = fixtureTypes.find((f) => f.id === rawConfig.fixtureType);
      if (!fixture) return null;
      if (rawConfig.finish === 'aluminum' && rawConfig.aluminumColor) {
        const aluFinish = fixture.finishes.find((f) => f.hasColorOptions);
        const color = aluFinish?.colorOptions.find((c) => c.id === rawConfig.aluminumColor);
        return color ? { photo: color.photo, label: `${fixture.shortName} · ${color.name}` } : null;
      }
      const finish = fixture.finishes.find((f) => f.id === rawConfig.finish);
      return finish ? { photo: finish.photo, label: `${fixture.shortName} · ${finish.name}` } : null;
    }

    case 'pathway': {
      const pathFixture = pathwayFixtures.find((f) => f.id === rawConfig.fixtureType);
      if (!pathFixture || !rawConfig.finish) return null;
      const finishId = rawConfig.finish.replace(`${rawConfig.fixtureType}-`, '');
      const allFinishes = [...pathFixture.finishes.brass, ...pathFixture.finishes.aluminum];
      const finish = allFinishes.find((f) => f.id === finishId);
      return finish ? { photo: finish.photo, label: `${pathFixture.name} · ${finish.name}`, whiteBg: finish.whiteBg } : null;
    }

    case 'specialty': {
      const fixture = wallWasherFixtures.find((f) => f.id === rawConfig.fixtureType);
      if (!fixture || !rawConfig.finish) return null;
      const finishId = rawConfig.finish.replace(`${rawConfig.fixtureType}-`, '');
      const allFinishes = [...fixture.finishes.brass, ...fixture.finishes.aluminum];
      const finish = allFinishes.find((f) => f.id === finishId);
      return finish ? { photo: finish.photo, label: `${fixture.name} · ${finish.name}`, whiteBg: finish.whiteBg } : null;
    }

    case 'deck-fixture': {
      const fixture = deckLightFixtures.find((f) => f.id === rawConfig.fixtureType);
      if (!fixture || !rawConfig.finish) return null;
      const finishId = rawConfig.finish.replace(`${rawConfig.fixtureType}-`, '');
      const allFinishes = [...fixture.finishes.brass, ...fixture.finishes.aluminum];
      const finish = allFinishes.find((f) => f.id === finishId);
      return finish ? { photo: finish.photo, label: `${fixture.name} · ${finish.name}`, whiteBg: finish.whiteBg } : null;
    }

    case 'tree': {
      const focus = treeFocusOptions.find((f) => f.id === rawConfig.focus);
      return { photo: '/light_form/well_light/well_light.webp', label: focus?.name || 'Well Light', whiteBg: true };
    }

    case 'color-only': {
      const color = v2AluminumColors.find((c) => c.id === rawConfig.aluminumColor);
      return color ? { photo: color.photo, label: color.name } : null;
    }

    case 'none': {
      const serviceDef = lightingServices.find((s) => s.configType === 'none');
      return serviceDef ? { photo: serviceDef.photo, label: serviceDef.name } : null;
    }

    default:
      return null;
  }
}
